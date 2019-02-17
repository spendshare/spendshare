# frozen_string_literal: true

class Initialize < ActiveRecord::Migration[5.2]
  def change
    create_table 'bills' do |t|
      t.string 'title'
      t.bigint 'added_by_id'
      t.boolean 'deleted'
      t.timestamps
    end
    create_table 'participations' do |t|
      t.decimal 'amount', precision: 8, scale: 2
      t.references :bill
      t.references :member
      t.timestamps
    end
    create_table 'members' do |t|
      t.references :user
      t.references :group
      t.timestamps
    end
    create_table 'groups' do |t|
      t.string 'title'
      t.timestamps
    end
    create_table 'users' do |t|
      t.string 'name'
      t.string 'email'
      t.timestamps
    end
    create_table :tokens do |t|
      t.string :token, index: true
      t.datetime :valid_until
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
