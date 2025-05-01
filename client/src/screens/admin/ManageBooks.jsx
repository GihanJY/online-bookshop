import React from 'react'
import SideNavigation from '../../components/admin/SideNavigation'


function ManageBooks() {
  return (
    <div>
      <SideNavigation />
      <div>
        <div>
        <h1>Manage Books</h1>
        <button>Add Book</button>
        </div>
        <div>
          <h1>Books</h1>
          <div>
            <h1>Book 1</h1>
            <h1>Book 2</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBooks;
