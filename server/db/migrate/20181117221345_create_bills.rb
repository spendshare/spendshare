class CreateBills < ActiveRecord::Migration[5.2]
  def change
    create_table :bills do |t|
      t.string :title
      t.references :added_by, index: true, foreign_key: { to_table: :users }
      t.decimal :amount, precision: 8, scale: 2

      t.timestamps
    end
  end
end
