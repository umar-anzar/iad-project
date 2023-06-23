const fun = async () => {
    const fs = require('fs');

    const path = __dirname + '/blogs/blog_';
    const blogs = []

    for (let index = 1; true; index++) {

        let folder = path + index + '/';


        if (fs.existsSync(folder)) {

            let image = await fs.promises.readFile(folder + 'image.jpg');

            let text = await fs.promises.readFile(folder + 'text.json');

            let blog = {
                image: image.toString('base64'),
                text: JSON.parse(text)
            };

            blogs.push(blog);

        } else {

            //res.status(200).json(blogs)
            console.log(blogs);
            break
        }
    }
};

fun();