class Api::V1::BillsController < ApplicationController
  def all
    ok(Bill.all)
  end

  def create
    params[:bill][:group_id] = params[:group_id].to_i
    bill = Bill.new(bill_params)
    bill.save!
    ok('siema')
  end

  def update
    group_id = params[:group_id].to_i
    ok
  end

  def delete
    ok
  end

  private

  def bill_params
    params.permit(:title, :group_id, :added_by_id, :deleted)
  end
end
