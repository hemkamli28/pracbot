import React, { useState } from 'react';
import axios from 'axios';
const UploadPaper = () => {
    const [year, setYear] = useState("");
    const [subject, setSubject] = useState("");
    const [branch, setBranch] = useState("");
    const [file, setFile] = useState("");
    const submitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("year", year);
        formData.append("subject", subject);
        formData.append("branch", branch);
        formData.append("file", file);
        console.log(subject, year, branch, file);
        try {
            const result = await axios.post(
                "http://localhost:5000/paper/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(result);
            alert("Uploaded Successfully!!!");
        }
        catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="App">
            <form className="formStyle" onSubmit={submitImage}>
            <h4>Upload Paper </h4>
                <br />
                <select
                    className="form-control"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Branch</option>
                    <option value="CBA">CBA</option>
                    <option value="BDA">BDA</option>
                    <option value="CS">CS</option>
                </select>
                <select
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Subject</option>
                    <option value="CD">CD</option>
                    <option value="IOT">IOT</option>
                    <option value="ML">ML</option>
                    <option value="TOC">TOC</option>
                    <option value="DBMS">DBMS</option>
                </select>
                <select
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Year</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>
                <br />
                <input
                    type="file"
                    className="form-control"
                    accept="application/pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <br />
                <button className="ring-2 px-3 py-1 rounded-sm" type="submit">
                    Submit
                </button>
            </form>

        </div>
    );
}


export default UploadPaper;
