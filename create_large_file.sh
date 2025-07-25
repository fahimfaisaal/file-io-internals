#!/bin/bash

lorem_text="
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
"

# Number of times to repeat the text (adjust this to control file size)
repeat_count=200000

# Create or truncate the output file
output_file="large-file.txt"
> "$output_file"

echo "Creating large file: $output_file"
echo "This may take a few moments..."

# Use a loop to append the text multiple times
for ((i=1; i<=$repeat_count; i++)); do
    echo "$lorem_text" >> "$output_file"
    
    # Print progress every 10000 iterations
    if ((i % 10000 == 0)); then
        echo "Progress: $i/$repeat_count iterations completed"
    fi
done

# Get the final file size
file_size=$(ls -lh "$output_file" | awk '{print $5}')
echo "File creation complete!"
echo "File size: $file_size"

