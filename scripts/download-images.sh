#!/bin/bash

# Create directories if they don't exist
mkdir -p ../public/images/courses
mkdir -p ../public/images/instructors

# Download course images
wget -O ../public/images/courses/arabic-grammar.jpg "https://source.unsplash.com/random/800x600/?arabic,calligraphy"
wget -O ../public/images/courses/fiqh.jpg "https://source.unsplash.com/random/800x600/?mosque,architecture"
wget -O ../public/images/courses/poetry.jpg "https://source.unsplash.com/random/800x600/?book,writing"
wget -O ../public/images/courses/quran.jpg "https://source.unsplash.com/random/800x600/?quran,reading"
wget -O ../public/images/studying.jpg "https://source.unsplash.com/random/1200x800/?study,library"

# Download instructor images
wget -O ../public/images/instructors/abdullah.jpg "https://source.unsplash.com/random/400x400/?professor"
wget -O ../public/images/instructors/aisha.jpg "https://source.unsplash.com/random/400x400/?teacher"
wget -O ../public/images/instructors/ahmed.jpg "https://source.unsplash.com/random/400x400/?lecturer"
