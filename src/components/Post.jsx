import "../css/Post.css"
function Post({item}) {
 
  return (
   <div className="conteiner-post" key={item.id}>

        <div className="image" style={{
            "backgroundImage": `url(${item.urls.small})`,
             "width":"30rem",
             "height":"30rem",
             "backgroundSize": "cover"
        }}>

        </div>
        <div>
            <p>{item.alt_description}</p>
        </div>
   </div>
  )
}

export default Post
