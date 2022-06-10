import clienteAxios from 'config/axios';

export const fileUpload = async (file) => {
        const formData = new FormData()
        // const formData = new FormData(file)
        formData.append('upload_preset','my_upload_image_almacen')
        formData.append('file',file)


        try {
            // const res = fetch('https://api.cloudinary.com/v1_1/drwvy8wbr/image/upload',{
            const res = await fetch('https://api.cloudinary.com/v1_1/dpfm70owp/image/upload',{
                method: 'POST',
                // headers: {
                //     Authorization: `Basic ${Buffer.from('514635422994182' + ':' + 'yxmC-u5Umr6_0mltLnKWigmL_Ws').toString('base64')}`
                //   },
                body: formData 
            });

            console.log(res);
            if ( res.ok ){
                const cloudResp = await res.json();
               console.log(cloudResp);
                return cloudResp.url
            }else{
                console.log('Fallo 1');
                throw await res.json();
            }
        }catch (error) {
            console.log('Fallo 2');
            throw error
        }
}