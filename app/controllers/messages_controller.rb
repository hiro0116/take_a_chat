class MessagesController < ApplicationController
  before_action :set_group
  before_action :set_user

  def index
    @message = Message.new
    @UserMessage = @user.messages
    @GroupMessage = @group.messages.includes(:user)
  end

  def create
    @UserMessage = @user.messages.new(message_params)
    if @UserMessage.save
      respond_to do |format|
        format.json
      end
    else
      @UserMessage = @user.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
    
    @GroupMessage = @group.messages.new(message_params)
    if @GroupMessage.save
      respond_to do |format|
        format.json
      end
    else
      @GroupMessage = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end

end
