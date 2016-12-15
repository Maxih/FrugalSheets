class Document < ApplicationRecord
  validates :name, :author, :content, presence: true

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

  has_many :document_groups, dependent: :destroy
  has_many :groups, through: :document_groups

end
