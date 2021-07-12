import React from "react";

const Article = () => {
  return (
    <div className="article">
      <h3>article</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        dolorem ullam dolore a ab nostrum? Deleniti ut, expedita error dolorum
        molestias sapiente nesciunt excepturi reiciendis tenetur totam qui
        numquam exercitationem impedit quas iusto praesentium, consequatur
        tempore ipsum iure sequi? Fuga voluptatibus libero doloremque, odit
        quasi magni voluptatem provident quae cum!
      </p>
      <div style={{display:'flex',margin:'10px'}}>
        <p> like </p> <p> dislike </p> <p> Nbre commentaires </p>
      </div>
    </div>
  );
};

export default Article;
