class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false, index: true

      t.timestamps
    end
  end
end
