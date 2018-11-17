class CreateTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :tokens do |t|
      t.string :token, index: true
      t.datetime :valid_until
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
