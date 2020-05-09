import React, { Component } from "react";
import "./Characters.css";
import { Row, Col } from "../../Components/Grid";
import TinyMceEditor from '../../Components/TinyMceEditor';
import { FormGroup } from "../../Components/Form";
import API from "../../utils/API";
import helpers from "../../utils/helpers";
import Modal from "../../Components/Modal";
import EditorRow from "../../Components/EditorRow";
import ItemSelectList from "../../Components/ItemSelectList/ItemSelectList";

type TCharacter = {
    name: string,
    id: number,
    preview_text?: string,
    character_text?: string,
    character_image?: string,
}

type TState = {
    characters: TCharacter[],
    editor: any,
    character_select: number,
    name: any,
    preview_text: any,
    character_image: any,
}

class CharacterPage extends Component {
    readonly state: TState = {
        characters: [],
        editor: "",
        character_select: 0,
        name: "",
        preview_text: "",
        character_image: ""
    }

    // @TODO what props??
    constructor(props: any) {
        super(props);

        this.handleEditClick = this.handleEditClick.bind(this);
        this.addNewChar = this.addNewChar.bind(this);
    }

    componentDidMount() {
        this.updateCharList()
        .then((characters: TCharacter[]) => {    
            const firstCharacter = characters[0];

            this.setState({
                editor: firstCharacter.character_text, 
                name: firstCharacter.name, 
                preview_text: firstCharacter.preview_text, 
                character_select: firstCharacter.id, 
                character_image: firstCharacter.character_image
            });

            // @TODO there's gotta be a better way to do this
            helpers.changeClass(firstCharacter.id, "active-char");
        })
        .catch((err: any) => {
            helpers.openModalForced("character");
        })
    }

    updateCharList = (): Promise<TCharacter[]> => {
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

    handleEditClick(e: any) {
        const id = parseInt(e.target.id);

        this.updateEditor(id);
    }

    updateEditor = (id: number) => {
        this.state.characters.forEach(character => {
            if (character.id === id) {
                this.setState({
                    character_select: id, 
                    name: character.name,
                    preview_text: character.preview_text, 
                    character_image: character.character_image
                });

                helpers.changeClass(character.id, "active-char");

                helpers.setEditorText(character.character_text);
            }

            else {
                // this removes the active class. @TODO probably can conditionally set class in template
                helpers.changeClass(character.id);
            }
        })
    }

    handleInputChange = (e: any) => {
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

    handleEditorChange = (e: any) => {
        API.updateOne("characters", this.state.character_select, "character_text", e.target.getContent())
        .then(res => {
            this.updateCharList();
        })
    }

    addNewChar = () => {
        // if user has just added their first character, this will make the modal closeable
        helpers.removeModalForcedAttributes();

        const name = document.getElementById("add-name-input") as HTMLInputElement;
        const preview = document.getElementById("add-preview-input") as HTMLInputElement;
        const image = document.getElementById("add-image-input") as HTMLInputElement;

        const newCharacter = {
            name: name.value.trim(),
            preview: preview.value.trim(),
            image: image.value.trim(),
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
                    <Col size={8} padding="pr-0" id="editor-char-col">
                        <EditorRow
                            mainFormLabel="One-line Bio"
                            formValue={this.state.preview_text}
                            formName="preview_text"   
                            onChange={this.handleInputChange}
                            onDelete={this.deleteChar}
                            shouldShowBottomRow={true}
                            leftLabel="Name"
                            leftFormValue={this.state.name}
                            leftFormName="name"
                            rightLabel="Image"
                            rightFormValue={this.state.character_image}
                            rightFormName="character_image"             
                        />

                        <TinyMceEditor
                            editorText={this.state.editor}
                            onChange={this.handleEditorChange}
                        />
                    </Col>

                    <ItemSelectList
                        items={this.state.characters}
                        onClick={this.handleEditClick}
                        promptId="add-character-prompt"
                        modalTarget="#add-character-modal"
                        itemType="character"
                    />
                </Row>

                <Modal
                    id="add-character-modal"
                    modalTitle="Add a Character"
                    saveId="add-new-char" 
                    onClick={this.addNewChar}
                >
                    <FormGroup
                        id="add-name-input"
                        labelText="Character Name"
                        formName="name"
                        placeholder="Jane Doe"
                    />

                    <FormGroup
                        id="add-preview-input"
                        labelText="One-line bio"
                        formName="preview_text"
                        placeholder="A quick overview of the character"
                    />

                    <FormGroup
                        id="add-image-input"
                        labelText="Image Link"
                        formName="image"
                        placeholder="Square images look best!"
                    />
                </Modal>
            </div>
        )
    }
}

export default CharacterPage;