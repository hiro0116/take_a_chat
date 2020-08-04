class Api::MessagesController < ApplicationController
  def index
    # user = User.find(params[:user_id])
    # last_message_id = params[:id]
    # @messages = user.messages.includes(:user).where("id > ?", last_message_id)

    group = Group.find(params[:group_id])
    last_message_id = params[:id]
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end