class Bill < ApplicationRecord
  has_many :users
  alias_attribute :participants, :users
  validates :title, :added_by_id, :amount, presence: true
  validate :global_ids_are_possible

  def create
    @bill = Bill.new(bill_params)
  end

  def serialize
    {
      title: title,
      added_by: added_by,
      amount: amount,
      participants: participants.map { |p| {
        name: p.name,
        email: p.email
      } }
    }
  end

  private

  def bill_params
    params.require(:title, :added_by, :amount, :participants)
  end

  def check_global_id(global_id)
    type, id = Base64.decode64(payer).split(':')
    return false if type != 'User'
    return false if (id =~ /^[0-9]+$/) == nil
  end

  def global_ids_are_possible
    check_global_id(payer)
  end
end
