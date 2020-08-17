import React from 'react';

export default function Actions({ filterText, onFilter, onNewTransaction }) {
  const handleChangeFilterText = (event) => {
    const userText = event.target.value;
    onFilter(userText);
  };

  const handleButtonClick = () => {
    onNewTransaction();
  };

  const { buttonStyle } = styles;

  return (
    <>
      <div className="center" style={{ margin: '20px 0px 10px 0px' }}>
        <button
          className="waves-effect waves-light btn"
          style={buttonStyle}
          disabled={filterText.trim() !== ''}
          onClick={handleButtonClick}
        >
          + Adicionar Novo Vendedor
        </button>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">search</i>
          <input
            // placeholder="Filtro"
            id="filter"
            type="text"
            value={filterText}
            onChange={handleChangeFilterText}
          />
          <label htmlFor="filter">Filtro</label>
        </div>
      </div>
    </>
  );
}

const styles = {
  buttonStyle: {
    maxWidth: '700px',
  },
};
