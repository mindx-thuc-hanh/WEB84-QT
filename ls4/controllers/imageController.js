import { v2 as cloudinary } from 'cloudinary';

const imageController = {
    uploadImage: async (req, res) => {
        try {
            // const file = req.file
            const listFile = req.files;
            console.log(listFile);
            // console.log(listFile)
            // if (!file) {
            //     return res.send('Please upload a file')
            // }
            // CRUD 
            (async function () {
                let returnArr = []
                // Configuration
                cloudinary.config({
                    cloud_name: 'dn9g2qx0y',
                    api_key: '871699447446464',
                    api_secret: 'KEep8-APfgBDmw2JlHoNBKaNN9I' // Click 'View API Keys' above to copy your API secret
                });
                console.log(listFile)
                for (const file of listFile) {
                    console.log(file)
                    // const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    // const fileName = file.originalname.split('.')[0];

                    // Upload an image
                    const uploadResult = await cloudinary.uploader
                        .upload(
                            file.path,
                        )
                        .catch((error) => {
                            console.log(error);
                        });

                    returnArr.push(uploadResult)

                }

                console.log(returnArr);
                res.send({
                    status: 'success',
                    message: 'File uploaded',
                    data: returnArr
                });
            })();

        } catch (err) {
            console.log(err)
            res.send({
                status: 'error',
                message: err.message
            })
        }
    },
}

export default imageController