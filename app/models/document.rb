class Document < ApplicationRecord
  validates :name, :author, :content, presence: true

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

end
#Document.create(name: "This is a test Document", author: User.find(2))
