import React from 'react'

const BoardItem = ({ data, itemClicked, enabled }) =>
{
    return (
        <button className='board-item' onClick={() => itemClicked(data)} disabled={data.text !== null || !enabled}>{data.text}</button>
    )
}

export default BoardItem