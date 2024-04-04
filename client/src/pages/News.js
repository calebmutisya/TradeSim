import React from 'react'
import Newsfx from '../constants/Newsfx'
import '../css/News.css'

export default function News() {
  return (
    <div>
      <header>TOP STORIES</header>
      <p className='storydet'>Keep track of what's happening in the Currency markets with our daily news briefs – designed to be read in 20 seconds or less.</p>
      <div className='newssec'>
        <Newsfx/>
      </div>
    </div>
  )
}
