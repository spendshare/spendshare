class CreateParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.belongs_to :user, index: true
      t.belongs_to :bill, index: true
      t.decimal :amount, precision: 8, scale: 2
    end
  end
end
