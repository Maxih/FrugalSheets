class CreateDocuments < ActiveRecord::Migration[5.0]
  def change
    create_table :documents do |t|
      t.string :name, null: false
      t.integer :author_id, null: false, index: true
      t.json :content, null: false
      t.timestamps
    end
  end
end
