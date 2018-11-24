class AlterBill < ActiveRecord::Migration[5.2]
  def change
    remove_column :bills, :payer_id
    add_column :bills, :visible, :boolean
  end
end
