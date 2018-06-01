import * as React from 'react';

export interface IMyCompProps {
  name: 'Tom' | 'Fanny'
}

function handleOnClick() {
  alert('You Clicked Me')
}

const MyComp = (props: IMyCompProps) => {
  return (
    <div><h3 onClick={handleOnClick}>{props.name}</h3></div>
  )
}

export default MyComp;