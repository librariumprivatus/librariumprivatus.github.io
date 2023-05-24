
#   Calibri

ebook-convert <file>.epub <file>.pdf


ebook-convert yasp2.epub yasp2.epub.pdf

# https://askubuntu.com/questions/299747/converting-epub-files-to-pdf-format

pandoc -s -t latex --toc --chapters \
        --latex-engine=lualatex $BOOK.epub -o $BOOK.pdf


#   ================================
#   ================================
#   ================================


pandoc -s -t latex --toc --chapters \
    --latex-engine=lualatex $BOOK.epub -o $BOOK.pdf


pandoc -s -t latex --toc --chapters \
    --latex-engine=lualatex yasp2.epub -o yasp2.epub-PAN.pdf

!LuaTeX error (file /tmp/tex2pdf.23440/3f21bef8dd2877aad72f5cddbf00284ca88fa0e7
.jpg): reading JPEG image failed (no marker found)
 ==> Fatal error occurred, no output PDF file produced!

pandoc: Error producing PDF


#   !!!    https://stackoverflow.com/questions/18178084/pandoc-and-foreign-characters

pandoc      \
  -f epub   \
  -t latex  \
  -o yasp2-PAND-4.pdf \
  --epub-chapter-level=1 \
  --pdf-engine=xelatex  \
  -V CJKmainfont="CMU Serif:style=Roman"
   yasp2.epub


pandoc      \
  -f epub   \
  -t latex  \
  -o lorem-PAND.pdf \
  --epub-chapter-level=1 \
  --pdf-engine=xelatex  \
  -C mainfont="CMU Serif" lorem.epub



pandoc      \
  -f epub   \
  -t latex  \
  -o lorem-PAND.pdf \
  --epub-chapter-level=1 \
  --pdf-engine=xelatex  \
  -V lang -V babel-lang=english \
  -V babel-otherlangs=russian  lorem.epub




pandoc -f epub -t latex -o lorem2.pdf -V fontenc=T2A lorem.epub


#   Good


pandoc -f epub -V mainfont="CMU Sans Serif:style=Medium" -t latex -o yasp6.epub.pdf -V fontenc=T2A  yasp6.epub


pandoc -V mainfont="CMU Sans Serif:style=Medium" -f epub -t latex -o yasp2.epub.pdf -V fontenc=T2A yasp2.epub




'CMU Serif:style=Roman'



pandoc --pdf-engine=xelatex -V mainfont="CMU Sans Serif:style=Medium" -f epub -t latex -o output-pdfs/dante.epub.pdf -V fontenc=T2A samples-epub/dante.epub


pandoc --pdf-engine=xelatex -f epub -t latex -o output-pdfs/dante.epub.pdf -V fontenc=T2A samples-epub/dante.epub



pandoc --pdf-engine=xelatex -V fontsize=12pt -V papersize:b5 -V mainfont="Times New Roman" -f epub -t latex -o output-pdfs/dante.epub.pdf -V fontenc=T2A samples-epub/dante.epub


pandoc --pdf-engine=xelatex -V fontsize=12pt -V papersize:b5 -V mainfont="CMU Sans Serif" -f epub -t latex -o output-pdfs/dante.epub.pdf -V fontenc=T2A samples-epub/dante.epub


pandoc --pdf-engine=xelatex -V fontsize=12pt -V papersize:b5 -V mainfont="PT Serif" -f epub -t latex -o output-pdfs/dante.epub.pdf -V fontenc=T2A samples-epub/dante.epub


pandoc --citeproc --metadata-file=metadata.yml --pdf-engine=xelatex -V fontsize=12pt -V papersize:b5 -V mainfont="CMU Serif" -f epub -t latex -o output-pdfs/dante.epub.pdf -V fontenc=T2A samples-epub/dante.epub



# https://pandoc.org/chunkedhtml-demo/6.2-variables.html























