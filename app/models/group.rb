class Group < ApplicationRecord
  validates :name, :owner, presence: true

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User

  has_many :user_groups, dependent: :destroy
  has_many :document_groups, dependent: :destroy

  has_many :users, through: :user_groups
  has_many :documents, through: :document_groups
end
