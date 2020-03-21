import React, { useState } from 'react';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = () => {
    const [ link, setLink ] = useState(''); 
    const { request } = useHttp();

    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try{
                const response = await request('/api/link/generate', 'POST', { from: link });

                console.log(response);
            }catch(e){}
        }
    } 

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <input
                    name="link"
                    type="text"
                    onChange={e => setLink(e.target.value)}
                    value={link}
                    onKeyPress={pressHandler}
                />
                <label htmlFor="link">Link</label>
            </div>
        </div>
    );
}