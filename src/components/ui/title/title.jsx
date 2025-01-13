"use client"
import Dropdown from '../dropdown/dropdown'
import title from './title.module.scss'

export default function Title({titleValue}) {
return (
  <div className={title['title-section']}>
        <h3>{titleValue}</h3>
        <Dropdown />
  </div>
)
}