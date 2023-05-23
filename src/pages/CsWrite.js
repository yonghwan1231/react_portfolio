import { useState } from "react";
//--------------------------------------------------------//
import { useInqueryWrite } from "../hooks/_customHookBundle";
import { textLengthLimit } from "../utils/_utilsBunddle";

export function CsWrite() {
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContents, setInquiryContents] = useState("");
  const inqueryWrite = useInqueryWrite();

  return (
    <section className="page-contents-wrap">
      <form>
        <div className="write-title">
          <h1>제목</h1>
          <input
            type="text"
            placeholder="30자 제한"
            value={inquiryTitle}
            onChange={e => {
              textLengthLimit(e, 30);
              setInquiryTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="write-contents">
          <h1>내용</h1>
          <textarea
            placeholder="1000자 제한"
            value={inquiryContents}
            onChange={e => {
              textLengthLimit(e, 1000);
              setInquiryContents(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="button-wrap">
          <input type="file" capture="camera" />
          <button
            onClick={e => {
              e.preventDefault();
              setInquiryTitle("");
              setInquiryContents("");
            }}
          >
            초기화
          </button>
          <button
            className="dark"
            onClick={e => {
              e.preventDefault();
              if (!inquiryTitle || !inquiryContents) return;
              inqueryWrite(inquiryTitle, inquiryContents).then(() => {
                setInquiryTitle("");
                setInquiryContents("");
              });
            }}
          >
            등록
          </button>
        </div>
      </form>
    </section>
  );
}
