import React from 'react';
import { Link } from 'react-router-dom';
import { DateFormat } from '../../configs/utils';

export default function List({ totalCount = 0, edges = [] }) {
  if (totalCount === 0) {
    return (<div className="no-content">暂无文章</div>);
  }
  return (
    <div className="list-wrapper">
      <ul>
        {edges.map(({ node: { title, url, updatedAt } }) => (
          <li className="block" key={url}>
            <h4 className="title">
              <Link to={`/blog/${url.replace(/.*issues\//, '')}`}>{title}</Link>
            </h4>
            <div className="info">
              <div className="reactions">
                <a href={url} target="_blank" rel="noopener noreferrer">原文链接</a>
              </div>
              <span className="create-time">
                {DateFormat(updatedAt)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>);
}
