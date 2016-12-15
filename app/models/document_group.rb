class DocumentGroup < ApplicationRecord
  validates :group, :document, presence: true
  validates_uniqueness_of :group_id, :scope => [:document_id]

  belongs_to :group
  belongs_to :document
end
