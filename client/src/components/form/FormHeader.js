export default function FormHeader(props) {
  const { editForm } = props;

  return (
    <header className="burg-header">
      <div className="m-intro">
        <div className="e-text">
          {/* EDIT PROP - CONDITIONAL TITLE RENDERING */}
          {editForm ? <h1>Update Recipe</h1> : <h1>Share Your Recipe</h1>}
        </div>
      </div>
    </header>
  );
}
