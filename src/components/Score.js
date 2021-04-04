import React from 'react'

const Score = ({redSrore=0, yellowScore=0}) => {
    return (
        <div className='score'>
            Score Board
            <div className='score-board'>
                <table>
                    <tr>
                        <th>Red</th>
                        <th>Yellow</th>
                    </tr>
                    <tr>
                        <td>
                            {redSrore}
                        </td>
                        <td>{yellowScore}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Score;