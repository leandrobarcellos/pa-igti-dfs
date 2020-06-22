import React from "react";
import TextField from "@material-ui/core/TextField";

class Catequistas extends React.Component {
    render() {
        return (
            <div>
                <h3>Dados do catequista</h3>
                <input type="hidden" id="idCatequista"/>
                <TextField id="idCatequista" label="Nome do Catequista"></TextField>
                <TextField id="endereco" label="Endereço do Catequista"></TextField>
                <TextField id="dtBatismo" label="Data do Batismo"></TextField>
                <TextField id="dtEucaristia" label="Data da 1a Eucaristia"></TextField>
                <TextField id="dtCrisma" label="Data do Crisma"></TextField>
                <label>Fez o curso de catequistas da Cúria de Brasília?</label>
                <label>Catequista de turmas de:</label>
                <select id="turmaCatequese" className="form-control select2">
                    <option selected={true} value="PRE_EUCARISTIA">Pré-Eucaristia</option>
                    <option value="EUCARISTIA">Eucaristica</option>
                    <option value="PERSEVERANCA">Perseverança</option>
                    <option value="CRISMA">Crisma</option>
                </select>
            </div>
        );
    }
}

export default Catequistas;