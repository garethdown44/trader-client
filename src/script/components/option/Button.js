import React from 'react'

export default function(props) {

  let { className, text } = props;

  let classNames = 'btn btn-xs ' + className;

  return <button  {...props}
                  className={classNames}>{text}</button>;
}