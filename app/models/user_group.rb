class UserGroup < ApplicationRecord
  validates :group, :user, presence: true
  validates_uniqueness_of :user, :scope => [:group]

  belongs_to :group
  belongs_to :user
end
