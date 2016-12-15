class CreateDocumentGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :document_groups do |t|
      t.integer :document_id, null: false, index: true
      t.integer :group_id, null: false, index: true

      t.timestamps
    end
  end
end
