class Api::V1::BillsController < ApplicationController
  def all
    ok(Bill.all)
  end

  def new
    @bill = Bill.participations.build
  end

  def create
    @bill = Bill.participations.build(params[:bill])
    ok
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
    params.permit(
      :title,
      :group_id,
      participations: %i[id amount]
    )
  end
end

#:title, :participations, :group_id, :bill