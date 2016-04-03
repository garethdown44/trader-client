import React from 'react'

export default function(props) {

  let { className, text } = props;

  let classNames = 'btn btn-sm ' + className;

  return <button  {...props}
                  className={classNames}>{text}</button>;
}