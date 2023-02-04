import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export function PostInput(props) {

  const { userAddr, setUserAddr, placeholder } = props
  let [findPost, setFindPost] = useState(false)

  const handleComplete = (data) => {
    let zonecode = data.zonecode
    let addr = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      addr += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFindPost(false)
    setUserAddr({ zonecode, addr, detailAddr: '' })
  };

  const detailAddr = (e) => {
    let copy = { ...userAddr }
    copy.detailAddr = e.target.value
    setUserAddr(copy)
  }

  return (
    <>
      <ul>
        <li>
          <input type="text" name="" value={userAddr.zonecode} readOnly placeholder={placeholder || '선택사항'} />
          <button className="dark" onClick={(e) => {
            e.preventDefault()
            setFindPost(true)
          }}>주소검색</button>
        </li>
        <li><input type="text" name="" value={userAddr.addr} readOnly /></li>
        <li><input type="text" name="" value={userAddr.detailAddr} onChange={detailAddr} /></li>
      </ul>
      {
        findPost
          ? <div className={'post-wrap'}>
            <button className="button-close" onClick={(e) => {
              e.preventDefault()
              setFindPost(false)
            }}></button>
            <DaumPostcode
              className={'find-post'}
              onComplete={handleComplete}
              {...props}
              style={{}}
            />
          </div>
          : null
      }
    </>
  );
}