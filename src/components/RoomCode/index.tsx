import React from 'react';
import './styles.scss';
import copyImage from '../../assets/images/copy.svg';


type RoomCodeProps = {
  code: string
}

function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button className="room_code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImage} alt="Copy Room Code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}

export default RoomCode;