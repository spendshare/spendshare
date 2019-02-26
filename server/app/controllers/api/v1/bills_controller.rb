class Api::V1::BillsController < ApplicationController
  def all
    ok(Bill.all)
  end

  def create
    puts "XXX"
    puts params
    puts bill_params
    puts "YYY"

    @bill = Bill.new(bill_params)
    @bill.group_id = params[:group_id]
    @bill.added_by = Member.find_by(group_id: params[:group_id],
                               user_id: current_user.id)
    params[:participations].map do |p|
      @participation = Participation.new(participation_params(p))
      @participation.bill = @bill
      @participation.save!
    end
    @bill.save!
    ok
  end

=begin
  def update
    group_id = params[:group_id].to_i
    ok
  end
=end

=begin
  def delete
    ok
  end
=end
  private

  def bill_params
    params.require(:bill).permit(
        :title
    )
  end

  def participation_params(p)
    p.permit(
        :amount
    )
  end

end

#:title, :participations, :group_id, :bill