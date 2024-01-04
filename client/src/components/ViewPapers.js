import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';
import PdfThumbnail from './PdfThumbnail';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const ViewPapers = () => {
  const [allPaper, setAllPapers] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [filter, setFilter] = useState({
    year: '',
    filename: '',
    subject: '',
    branch: '',
  });

  const getPdf = async () => {
    try {
      const result = await axios.get('http://localhost:5000/paper/all');
      console.log(result.data.papers);
      setAllPapers(result.data.papers);
    } catch (error) {
      console.log(error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/uploads/${pdf}`);
  };

  useEffect(() => {
    getPdf();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    const handleFilterSubmit = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/paper/filter?branch=${filter.branch}&subject=${filter.subject}&year=${filter.year}&filename=${filter.filename}`
        );
        console.log(result.data.papers);
        setAllPapers(result.data.papers);
      } catch (error) {
        console.log(error);
      }
    };

    handleFilterSubmit();
  }, [filter]);

  return (
    <div className="App">
      <div className="mt-4">
        <div>
          <label>
            Year:
            <input type="text" name="year" value={filter.year} onChange={handleFilterChange} />
          </label>
          <label>
            Filename:
            <input type="text" name="filename" value={filter.filename} onChange={handleFilterChange} />
          </label>
          <label>
            Subject:
            <input type="text" name="subject" value={filter.subject} onChange={handleFilterChange} />
          </label>
          <label>
            Branch:
            <input type="text" name="branch" value={filter.branch} onChange={handleFilterChange} />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  ">
          {allPaper == null
            ? ''
            : allPaper.map((data) => (
                <div
                  className="p-2 mx-[6rem] my-4 cursor-pointer transform transition-transform hover:scale-125 "
                  key={data._id}
                  onClick={() => showPdf(data.filename)}
                >
                  <PdfThumbnail pdfFile={`http://localhost:5000/uploads/${data.filename}`} />
                  <h6>{data.filename}</h6>
                </div>
              ))}
        </div>
      </div>
      {pdfFile && <PdfComp pdfFile={pdfFile} onClose={() => setPdfFile(null)} />}
    </div>
  );
};

export default ViewPapers;
