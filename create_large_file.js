const fs = require('fs');

const loremText = `
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
`;

const REPEAT_COUNT = 200000;
const OUTPUT_FILE = 'large-file.txt';

// Create write stream
const writeStream = fs.createWriteStream(OUTPUT_FILE);

console.log(`Creating large file: ${OUTPUT_FILE}`);
console.log('This may take a few moments...');

let written = 0;

function writeChunk() {
    if (written >= REPEAT_COUNT) {
        writeStream.end();
        return;
    }

    // Write the chunk
    const canContinue = writeStream.write(loremText);
    written++;

    // Show progress every 10000 iterations
    if (written % 10000 === 0) {
        console.log(`Progress: ${written}/${REPEAT_COUNT} iterations completed`);
    }

    // If buffer is full, wait for drain event
    if (!canContinue) {
        writeStream.once('drain', writeChunk);
    } else {
        setImmediate(writeChunk);
    }
}

// Start writing
writeChunk();

// Handle completion
writeStream.on('finish', () => {
    const stats = fs.statSync(OUTPUT_FILE);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log('File creation complete!');
    console.log(`File size: ${fileSizeInMB}MB`);
}); 
