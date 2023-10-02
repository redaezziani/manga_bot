import axios from 'axios';

const downloadImages = async (imageUrls, outputDirectory) => {
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    try {
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      const fileName = `${i + 1}.png`; // You can customize the file naming here
      const filePath = `${outputDirectory}/${fileName}`;
      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Downloaded: ${fileName}`);
    } catch (error) {
      console.error(`Failed to download: ${imageUrl}`, error);
    }
  }
};

export { downloadImages };





