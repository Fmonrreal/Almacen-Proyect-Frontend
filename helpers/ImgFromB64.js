const ImgFromB64 = (imagedata) => {
    console.log(imagedata)
    let n = imagedata
    return ( 
        <img src={`data:image/jpeg;base64,${n.imagedata}`} />
     );
}
 
export default ImgFromB64;


// export const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />