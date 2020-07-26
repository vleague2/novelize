import React, { Component } from "react";

import "./Characters.css";
import { Row, Col } from "../../Components/Grid";
import { FormGroup } from "../../Components/Form";
import API from "../../utils/API";
import helpers from "../../utils/helpers";
import Modal from "../../Components/Modal";
import ItemSelectList from "../../Components/ItemSelectList/ItemSelectList";
import { StoryContext } from "../../App";
import CharacterEditorRow from "../../Components/CharacterEditRow/CharacterEditorRow";
import { Editor } from "../../Components/Editor/Editor";

export type TCharacter = {
  name: string;
  id: number;
  preview_text?: string;
  character_text?: string;
  character_image?: string;
};

type TState = {
  characters: TCharacter[];
  newCharacterName: string;
  newCharacterBio: string;
  newCharacterImage: string;
  activeCharacter: TCharacter;
};

const CharacterPage = () => {
  const storyContext = React.useContext(StoryContext);

  const [state, setState] = React.useState<TState>({
    characters: [],
    newCharacterName: "",
    newCharacterBio: "",
    newCharacterImage: "",
    activeCharacter: {name: undefined, id: undefined},
  });

  const [forceAddCharacter, setForceAddCharacter] = React.useState<boolean>(false);

  React.useEffect(() => {
    updateCharList();
  }, []);

  React.useEffect(() => {
    if (state.characters.length > 0 && state.activeCharacter.id === undefined) {
      setState({ ...state, activeCharacter: state.characters[0]});
    }
  }, [state.characters])

  React.useEffect(() => {
    if (state.characters.length === 0) {
      setForceAddCharacter(true);
    } else {
      setForceAddCharacter(false);
    }
  }, [state.characters])

  function updateCharList(): Promise<TCharacter[]> {
    return new Promise((resolve, reject) => {
      API.getAll("characters", storyContext.storyId)
        .then(res => {
          if (res.data.error) {
            // @TODO why is the API sending it back like this 
            window.location.href = "/login";
          } else {
            const characters = res.data;

            helpers.decode(characters);

            setState({ ...state, characters });
          }
        })
        .catch(err => {
          window.location.href = "/login";

          reject(err);
        });
    });
  }

  function handleEditClick(characterId: number) {
    const character = state.characters.find((character) => character.id === characterId);

    setState({ ...state, activeCharacter: character});
  }

  function handleEditorChange(editor) {
    setState((current) => ({
      ...current,
      activeCharacter: {
        ...current.activeCharacter,
        character_text: editor.getData(),
      }
    }))
  }

  function addNewChar() {
    const newCharacter = {
      name: state.newCharacterName.trim(),
      preview: state.newCharacterBio.trim(),
      image: state.newCharacterImage.trim(),
      storyId: storyContext.storyId,
    };

    console.log(newCharacter)

    API.addNewCharacter(newCharacter)
      .then(addedCharacter => {
        updateCharList();
      })
      .catch(err => {
        // @TODO temporarily an alert. please change
        alert("Can't save empty character name!");
        console.log(err);
        // @TODO don't close the modal :(
      });
  }

  function saveActiveCharacter() {
    const contentToUpdate = {
      name: state.activeCharacter.name,
      preview_text: state.activeCharacter.preview_text,
      character_image: state.activeCharacter.character_image,
      character_text: state.activeCharacter.character_text,
    };

    API.updateAll("characters", state.activeCharacter.id, contentToUpdate)
      .then(res => {
        updateCharList();
      })
      .catch((response) => {
        // @TODO this is temporary until we have client-side validation
        alert("Can't save empty character name!");
        // @TODO error handling (i.e. failed to save, try again)
      })
  }

  function deleteChar() {
    API.deleteOne("characters", state.activeCharacter.id).then(res => {
      updateCharList();
    });
  }

  function updateActiveCharacter(e: React.ChangeEvent<HTMLInputElement>, propertyKey: string) {
    setState({ 
      ...state,
      activeCharacter: {
        ...state.activeCharacter,
        [propertyKey]: e.target.value,
      }
    })
  }

  return (
    <div id="char-edit">
      <Row id="editor-char-row">
        <Col size={8} padding="pr-0" id="editor-char-col">
          <CharacterEditorRow
            previewTextValue={state.activeCharacter.preview_text}
            nameValue={state.activeCharacter.name}
            imageValue={state.activeCharacter.character_image}
            onPreviewTextChange={(e) => updateActiveCharacter(e, 'preview_text')}
            onNameChange={(e) => updateActiveCharacter(e, 'name')}
            onImageChange={(e) => updateActiveCharacter(e, 'character_image')}
            onSave={saveActiveCharacter}
            onDelete={deleteChar}
          />

          <Editor 
            onChange={handleEditorChange}
            data={state.activeCharacter.character_text}
          />
        </Col>

        <ItemSelectList
          items={state.characters}
          onEditClick={handleEditClick}
          promptId="add-character-prompt"
          modalTarget="#add-character-modal"
          itemType="character"
          activeCharacter={state.activeCharacter.id}
        />
      </Row>

      <Modal
        id="add-character-modal"
        modalTitle="Add a Character"
        saveId="add-new-char"
        onClick={addNewChar}
        canClose={!forceAddCharacter}
      >
        <FormGroup
          id="add-name-input"
          labelText="Character Name"
          formName="name"
          placeholder="Jane Doe"
          value={state.newCharacterName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, newCharacterName: e.target.value })
          }
        />

        <FormGroup
          id="add-preview-input"
          labelText="One-line bio"
          formName="preview_text"
          placeholder="A quick overview of the character"
          value={state.newCharacterBio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, newCharacterBio: e.target.value })
          }
        />

        <FormGroup
          id="add-image-input"
          labelText="Image Link"
          formName="image"
          placeholder="Square images look best!"
          value={state.newCharacterImage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, newCharacterImage: e.target.value })
          }
        />
      </Modal>
    </div>
  )
};

export default CharacterPage;
