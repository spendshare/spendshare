class Bill < ApplicationRecord
  has_many :users
  belongs_to :payer, class_name: 'User'
  belongs_to :added_by, class_name: 'User'
  alias_attribute :participants, :users

  validates :title, :payer, :added_by, :amount, presence: true
  validate :global_ids_are_possible

  def serialize
    {
      title: title,
      added_by: added_by,
      amount: amount,
      participants: participants.map do |p|
        {
          name: p.name,
          email: p.email
        }
      end
    }
  end

  private

  def bill_params
    params.require(:title, :added_by, :amount, :participants)
  end

  def check_global_id(global_id)
    return false if global_id.nil?

    type, id = Base64.decode64(payer).split(':')
    return false if type != 'User'
    return false if (id =~ /^[0-9]+$/).nil?
  end

  def global_ids_are_possible
    check_global_id(payer)
  end
end
