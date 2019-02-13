import React, { Component } from "react";
import "./Characters.css";
import { Row, Col } from "../../Components/Grid";
import CharacterCardEdit from "../../Components/CharacterCardEdit";
import { Editor } from '@tinymce/tinymce-react';
import BackButton from "../../Components/BackButton";
import Button from "../../Components/Button";
import AddAnItem from "../../Components/AddAnItem";
import { FormFieldInput } from "../../Components/Form";
import API from "../../utils/API";
import helpers from "../../utils/helpers";
import Modal from "../../Components/Modal";
import EditorRow from "../../Components/EditorRow";

class CharacterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: [],
            editor: "",
            character_select: "",
            name: "",
            preview_text: "",
            character_image: ""
        }

        this.handleEditClick = this.handleEditClick.bind(this);
        this.addNewChar = this.addNewChar.bind(this);
    }

    componentDidMount() {
        this.updateCharList()
        .then(characters => {    
            const firstCharacter = characters[0];

            this.setState({
                editor: firstCharacter.character_text, 
                name: firstCharacter.name, 
                preview_text: firstCharacter.preview_text, 
                character_select: firstCharacter.id, 
                character_image: firstCharacter.character_image
            });

            // @TODO there's gotta be a better way to do this
            this.changeClass(firstCharacter.id, "active-char");
        })
        .catch(err => {
            helpers.openModalForced();
            // this.forceAddCharacter();
        })
    }

    updateCharList = () => {
        return new Promise((resolve, reject) => {
            // @TODO good place to use redux
            const storyId = localStorage.getItem("currentStoryId");

            API.getAll("characters", storyId)
            .then(res => {
                if (res.data.error) {
                    window.location.href="/login"
                }

                else {
                    const characters = res.data;

                    if (characters.length > 0) {
                        helpers.decode(characters);

                        this.setState({ characters });

                        resolve(characters);
                    }

                    else {
                        reject();
                    }
                }
            })
            .catch(err => {
                window.location.href="/login"

                reject(err);
            })
        })
    }

    // @TODO helper function-ize
    changeClass(id, active) {
        document.getElementById(id).setAttribute("class", `card rounded-0 ${active}`);
    }

    handleEditClick(e) {
        const id = parseInt(e.target.id);

        this.updateEditor(id);
    }

    updateEditor = (id) => {
        this.state.characters.forEach(character => {
            if (character.id === id) {
                this.setState({
                        character_select: id, 
                        name: character.name,
                        preview_text: character.preview_text, 
                        character_image: character.character_image
                    });

                this.changeClass(character.id, "active-char");

                helpers.setEditorText(character.character_text);
            }

            else {
                // this removes the active class. @TODO probably can conditionally set class in template
                this.changeClass(character.id);
            }
        })
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

        API.updateOne("characters", this.state.character_select, name, value)
        .then(res => {
            console.log(res);

            this.updateCharList();
        })
        .catch(err => {
            // @TODO change this from an alert. this is temporary......
            alert("Name cannot be empty!");

            // @TODO this would be a great place to use redux to replace the character name instead of making another API call
            // replace character name field because now it's awkwardly blank
        })
    }

    handleEditorChange = (e) => {
        API.updateOne("characters", this.state.character_select, "character_text", e.target.getContent())
        .then(res => {
            this.updateCharList();
        })
    }

    addNewChar = () => {
        // if user has just added their first character, this will make the modal closeable
        helpers.removeModalForcedAttributes();

        const newCharacter = {
            name: document.getElementById("add-name-input").value.trim(),
            preview: document.getElementById("add-preview-input").value.trim(),
            image: document.getElementById("add-image-input").value.trim(),
            storyId: localStorage.getItem("currentStoryId")
        }

        API.addNewCharacter(newCharacter)
        .then(addedCharacter => {
            // @TODO this can probably happen in the modal component instead
            helpers.emptyModalContent();

            this.updateCharList()
            .then(characters => {
                this.updateEditor(addedCharacter.data.id)
            })
        })
        .catch(err => {
            // @TODO temporarily an alert. please change
            alert("Can't save empty character name!");
            console.log(err);
            // @TODO don't close the modal :(
        })
    }

    deleteChar = () => {
        const id = this.state.character_select;

        API.deleteOne("characters", id)
        .then(res => {
            console.log(res);

            this.updateCharList()
            .then(characters => {
                // display the first character in the editor since the selected one is now deleted
                const newSelectId = characters[0].id;

                this.updateEditor(newSelectId);
            })
            .catch(characters => {
                // if we're catching an error, that means we have no characters
                this.setState({ characters: [] });

                helpers.openModalForced();
            })
        })
    }

    render() {
        return (
            <div id="char-edit">
                <Row id="editor-char-row">
                    <Col size="8" p="pr-0" id="editor-char-col">
                        <EditorRow
                            mainFormLabel="One-line Bio"
                            placeholder={this.state.preview_text}
                            formName="preview_text"   
                            onChange={this.handleInputChange}
                            onDelete={this.deleteChar}
                            shouldShowBottomRow={true}
                            leftLabel="Name"
                            leftPlaceholder={this.state.name}
                            leftFormName="name"
                            rightLabel="Image"
                            rightPlaceholder={this.state.character_image}
                            rightFormName="character_image"             
                        />

{/* @TODO make this a component */}
                        <Editor
                            apiKey='gbm0zd2ds9781n2k8pn8uz62cjz9o1f5p8fe0gz39e6mcaqh' 
                            cloudChannel='dev'
                            initialValue={`<p>${this.state.editor}</p>`}
                            id="text-editor-char"
                            init={{
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor textcolor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table contextmenu paste code help wordcount'
                                ],
                                toolbar: 'insert | undo redo |  formatselect | bold italic forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                menubar: false,
                                content_css: [
                                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                    '//www.tinymce.com/css/codepen.min.css'],
                                height: 386,
                                setup: function(ed) {
                                    ed.on('keydown', function(event) {
                                        if (event.keyCode === 9) { // tab pressed
                                            ed.execCommand('mceInsertContent', false, '&emsp;'); 
                                            event.preventDefault();
                                            return false;
                                        }
                                    });
                                }
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </Col>

{/* @TODO this entire column probably can also be a component */}
                    <Col size="4" p="pr-0 pl-0" m="mr-0" id="char-list-col">
                        {this.state.characters.map(character => {
                            return <CharacterCardEdit 
                                id={character.id} 
                                title={character.name} 
                                preview={character.preview_text} 
                                key={character.id} 
                                image={character.character_image} 
                                onClick={this.handleEditClick}
                            />
                        })}

                        <AddAnItem
                            id="add-char-prompt"
                            target="#add-char-modal"
                        >Add a Character </AddAnItem>
                    </Col>
                </Row>

                <Modal
                    id="add-char-modal"
                    modalTitle="Add a Character"
                    saveId="add-new-char" 
                    onClick={this.addNewChar}
                >
                {/* @TODO componentize these better */}
                    <div className="form-group">
                        <label htmlFor="add-name-input" className="label-title">Character Name</label>
                        <FormFieldInput id="add-name-input" name="name" placeholder="Jane Doe" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="add-preview-input" className="label-title">One-line bio</label>
                        <FormFieldInput id="add-preview-input" name="preview_text" placeholder="A quick overview of the character"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="add-image-input" className="label-title">Image Link</label>
                        <FormFieldInput id="add-image-input" name="image" placeholder="Square images look best!"/>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default CharacterPage;