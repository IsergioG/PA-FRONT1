  
  
  export const handleSubmitDocuments = async (e,file, id, subject) => {
    console.log("subject",subject,"id",id,"file",file); 
    try{
    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('file', file); // Añadir el archivo
    formData.append('id', id); // Añadir el texto
    formData.append('subject', subject); // Añadir el texto
      console.log(formData);
      
    // Enviar la solicitud usando fetch
    const response = await fetch('http://localhost:5000/transmitter/init', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json(); // Asume que el backend responde con JSON
    return {status:true, data};
    }catch(err){
      console.error("Error",err)
    }
  };

  export default handleSubmitDocuments;

