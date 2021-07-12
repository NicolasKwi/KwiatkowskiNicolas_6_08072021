import React from 'react';
import Article from '../components/Article';

const UserArticles = () => {
    return (
        <div className="user-articles">
            <ul>
                <li><Article /></li>
                <li><Article /></li>
                <li><Article /></li>
                <li><Article /></li>
                <li><Article /></li>
            </ul>
            
        </div>
    );
};

export default UserArticles;